#include <iostream>
#include <string>
using namespace std;

class Hero{
public:
    Hero():Date(NULL){
    }
    Hero(int date){
        Date = new int; //new 分配内存空间，是指向一个堆区的指针
        *Date = date;
    }
    //double free 问题，解决浅拷贝问题，需要重载赋值运算符
    ~Hero(){
        if(Date != NULL){
            delete Date; //释放内存，防止内存泄漏
            Date = NULL;
        }
    }
    Hero& operator= (Hero &h){ //重载赋值运算符
        if(this == &h){ //自我赋值检测
            return *this;
        }
        if(Date != NULL){ //释放已有内存，防止内存泄漏
            delete Date;
            Date = NULL;
        }
        Date = new int; //分配新内存
        *Date = *(h.Date); //深拷贝数据
        return *this; //返回当前对象的引用
    }



    int *Date;
};



int main(){
    Hero h1(10);
    Hero h2(20);
    Hero h3(30);
    cout << "h1.Date = " << (h1.Date) << endl;
    cout << "h2.Date = " << (h2.Date) << endl;
    h1=h2; //默认赋值运算符重载，浅拷贝
    cout << "h1.Date = " << (h1.Date) << endl;
    cout << "h2.Date = " << (h2.Date) << endl;
    h3=h2=h1; //默认赋值运算符重载，浅拷贝 
    cout << "h3.Date = " << (h3.Date) << endl;

    return 0;
}
/*
如果不重载赋值运算符，默认的赋值运算符会进行浅拷贝，即将对象的每个成员逐个复制，包括指针成员。这会导致多个对象指向同一块内存区域，从而引发double free问题。
为了解决这个问题，我们需要重载赋值运算符，使其进行深拷贝。深拷贝会为每个对象分配独立的内存空间，从而避免多个对象指向同一块内存区域的问题。

没有与这些操作数匹配的 "=" 运算符
操作数类型为: Hero = Hero
所以重载函数要加上引用   因为 赋值运算符的左操作数是一个对象的引用 执行顺序从右到左 h3=(h2=h1);
    Hero operator= (Hero &h){ //重载赋值运算符
        if(this == &h){ //自我赋值检测
            return *this;
        }
        if(Date != NULL){ //释放已有内存，防止内存泄漏
            delete Date;
            Date = NULL;
        }
        Date = new int; //分配新内存
        *Date = *(h.Date); //深拷贝数据
        return *this; //返回当前对象的引用
    }
*/