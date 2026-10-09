#include <iostream>
using namespace std;

//同名属性访问
//继承父类，不会覆盖同名变量，因为父类和子类存储同名变量的位置不一样
//如果需要访问特定类的同名变量，只要增加一个作用域就可以了

//同名函数类似

class Animal{
public:
    Animal(){
        m_pub=1;
    }
    int m_pub;
    void eat(){
        cout << "Animal eat" << endl;
    }
};

class Cat : public Animal{
public:
    Cat(){
        m_pub=2;
    }
    int m_pub;
    void eat(){
        Animal::eat();
        cout << "Cat eat" << endl;
    }
};

void Test(){
    Cat c;
    cout << c.m_pub << endl;
    c.eat();
    // c.Animal::eat();
    cout << c.Animal::m_pub <<endl;
}

int main(){
    Test();
    return 0;
}