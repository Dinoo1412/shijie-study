#include <iostream>
using namespace std;
class Point {
public:
    Point(int x,int y):m_x(x),m_y(y){

    }   //初始化列表

    //重载  ==  关系运算符，并且保证比较数和被比较数的值保持不变
    bool operator==(const Point& other)const{
        return m_x==other.m_x && m_y==other.m_y;
    }
    /*
    - __参数中的`const`__：`const Point& other` - 保证被比较的对象`other`在比较过程中不会被修改。这是一个常量引用，确保只能读取`other`的数据成员，不能修改它们。

    - __函数后的`const`__：`const`在函数参数列表后面 
    - 保证调用该运算符的对象（即比较数）在比较过程中不会被修改。这意味着在`operator==`函数体内，不能修改调用该函数的对象的任何数据成员（即不能修改`this`指针指向的对象的成员）。

    */
   bool operator<(const Point& other)const{
    int d = m_x *m_x + m_y*m_y;
    int otherd = other.m_x *other.m_x + other.m_y+other.m_y;
    return d < otherd;
   }
   //当已经定义小于和等于之后，不用在意大于的实际意义，直接采用相反的逻辑
   bool operator>(const Point& other)const{
    if(*this == other){
        return false;

    }
    if(*this < other){
        return false;
    }
    return true;

   }
private:
    int m_x,m_y;
};

int main (){
    Point a(2,1);
    Point b(2,2);   
    if(a==b){
        cout << "a 和 b 相等" << endl;
    }
    if(a<b){
         cout << "a比b更加接近原点" << endl;
    }
    else{
         cout << "a比b更加接近原点" << endl;
    }

    return 0 ;    

}