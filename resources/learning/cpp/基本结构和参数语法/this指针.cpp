#include <iostream>
using namespace std;


/*
this 指针
1. this 指针是一个隐含在类的非静态成员函数中的指针，指向调用该成员函数的对象本身。   ----获取对象本身
2. this 指针的类型是类的指针类型，指向当前对象的地址。
3. 可以通过 this 指针访问当前对象的成员变量和成员函数。
4. 在成员函数中，如果成员变量和参数名相同，可以使用 this 指针来区分。     ----解决命名冲突


this      *this
 &h1    *(&h1)= h1
*/

class Hero {
public:
    Hero(int hp)
    {
        this->hp = hp; //this 指针指向当前对象的地址，通过this指针访问当前对象的成员变量   如果不使用this指针，则会出现变量名冲突的问题，int hp会被优先识别为参数hp
        cout << "Hero对象的地址是：" << this << endl; //输出当前对象的地址
        cout << "成员变量H_hp的地址是：" << &hp << endl; //输出成员变量的地址
        cout << (*this).hp << endl; //通过解引用this指针访问成员变量
    }
    int hp;
};
int main (){
    Hero h1(100);
    cout << "h1对象的地址是：" << &h1 << endl; //输出对象的地址
    cout << "------------------" << endl;
    cout << h1.hp << endl; //通过对象访问成员变量
    cout << "------------------" << endl;
    cout << (*(&h1)).hp << endl;

    return 0;
}
