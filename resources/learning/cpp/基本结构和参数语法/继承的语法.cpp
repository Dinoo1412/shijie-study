#include <iostream>
#include <string>
using namespace std;
/*
继承的语法： class 子类：继承方式 父类{}
子类 -> 派生类
父类 -> 基类

*/
class Ainmal{
public: 
    void eat(){
        cout << "eat" <<endl;
    }
};

class Cat : public Ainmal{
public:
    void say(){
        cout << "meow" << endl;
    }
};

class Dog : public Ainmal{
public:
    void say(){
        cout << "w" << endl;
    }
};


int main(){
    Cat c;
    c.eat();
    c.say();
    Dog d;
    d.eat();
    d.say();
    return 0;
}