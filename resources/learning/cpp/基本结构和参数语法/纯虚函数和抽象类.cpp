#include <iostream>
using namespace std;

//父类中的函数没有任何实现，只靠子函数重写实现
//只要有纯虚函数的类叫做抽象类
//抽象类无法实例化对象
class Animal{
public:
    virtual void eat()=0;  //纯虚函数
};

class Cat : public  Animal{
public:
    virtual void eat(){
        cout << "Cat eat" << endl;
    }
};



int main(){
    // Animal a;  不允许使用抽象类类型 "Animal" 的对象:
    Cat c;
    c.eat();
    return 0;
}