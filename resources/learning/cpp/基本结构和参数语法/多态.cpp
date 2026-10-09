/*
多态按字面的意思就是多种形态。
当类之间存在层次结构，并且类之间是通过继承关联时，就会用到多态。
在 C++ 中，多态（Polymorphism）是面向对象编程的重要特性之一。
C++ 多态允许使用基类指针或引用来调用子类的重写方法，从而使得同一接口可以表现不同的行为。
多态使得代码更加灵活和通用，程序可以通过基类指针或引用来操作不同类型的对象，而不需要显式区分对象类型。这样可以使代码更具扩展性，在增加新的形状类时不需要修改主程序。
*/


#include <iostream>
using namespace std;

class Animal{
public:
    Animal(){
    }
    virtual void eat(){    //使用虚函数关键字virtual    虚函数实现多态
        //函数传参是个动物，但是传入不同的动物，会产生不同的行为,这就是多态！！！！
        cout << "Animal eat" << endl;
    }
};



/*
    底层实现函数为：
    class Ainmal{
    public:
        void *vfptr;   //指向虚函数实际指向函数的地址    --虚函数地址表
        int a;
        virtual void eat();
    }

*/
class Cat : public  Animal{
public:
    Cat(){
    }
    void eat(){
        cout << "Cat eat" << endl;
    }
};
class Pig : public  Animal{
public:
    Pig(){
    }
    void eat(){
        cout << "Pig eat" << endl;
    }
};


void eat(Animal &a){
    a.eat();
}

void test(){
    Cat c;
    eat(c);  //希望输出 Cat eat
    Pig p;
    eat(p);

}

int main(){
    test(); //输出animal eat  是因为函数调用链为：main-> test-> eat ->Animal::eat
    //调用虚函数之后就会输出 cat eat

    //含有虚函数类型的对象，每个对象初始化的时候，就会附带一个虚函数列表，指向实际类型的虚函数
    //即*vfptr
    return 0;
}