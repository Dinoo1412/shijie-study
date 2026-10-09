#include <iostream>
using namespace std;

/*
class 子类名 : 继承方式 父类名 {};

继承方式：public private protected
组合方式+权限：3*3 =  9

*子类对父类的访问权限
*竖列为继承方式
              |    public     |    protected      |      private    |     --父类的访问权限
    public    |    public     |    protected      |      无法访问    |   
    protected |    protected  |     protected     |      无法访问    |
    private   |    private    |     private       |      无法访问    |
*/


class Animal{
public:
    int m_pub;
protected:
    int m_pro;
private:
    int m_pri;
};

//公共继承
class Cat:public Animal {
public:
    Cat(){
        m_pub=1;
        m_pro=2;
        // m_pri=3;   父类私有成员，子类公有继承，无法访问

    }
};

class BossCat :public Cat {
public:
    BossCat(){
        m_pub=1;
        m_pro=2;  //父类的保护成员，子类还是保护成员 不会改变其访问属性
    }
};

// 保护继承
class Dog:protected Animal {
public:
    Dog(){
        m_pub=1;
        m_pro=2;
        // m_pri=3;   父类私有成员，子类公有继承，无法访问

    }
};

class PoliceDog : public Dog {
    PoliceDog(){
        m_pro=1; //子类继承没有问题，验证在testDog中是保护成员，而不是私有成员
        m_pub=2;
    }
};

//私有继承
class Pig : private Animal{
public:
    Pig(){
        m_pro=1;
        m_pub=2;
        // m_pri=3;   父类私有成员，子类公有继承，无法访问
    }
};

class wildPig :public Pig{
public:
    wildPig(){
        // m_pub=1; 不可访问  该变量是私有成员

    }

};

void testCat(){

    Cat c;
    c.m_pub=1;
    // c.m_pro=2; 保护成员
}

void testDog(){
    Dog d;
    // d.m_pub=1; 保护成员
    // d.m_pro=2; 保护成员
}

void testPig(){
    Pig p;
    // p.m_pub=1;  私有成员
    // p.m_pro=2;  私有成员
}
int main(){

    return 0;
}

//验证方式：类外类内都可以访问--public 类外无法访问，类内可以访问/再次继承子类可访问--protected  类外都不可以访问，类内可以访问/再次继承，子类不可以访问--private