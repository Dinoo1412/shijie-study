#include <iostream>
#include <vector>
using namespace std;

//const修饰成员函数和mutable关键字
/*
1. 常函数：在成员函数后加上const关键字，表示该函数不会修改对象的成员变量。
    常函数只能调用其他的常函数，不能调用普通函数。
2. mutable关键字：用于修饰成员变量，表示该成员变量可以在常函数中修改。
   mutable修饰的成员变量不受const修饰的成员函数的限制，可以在常函数中修改。
*/

class Hero {
public:
    //常函数：在成员函数后加上const关键字，表示该函数不会修改对象的成员变量
    void showInfo() const
    {
        counter++; //可以修改mutable修饰的成员变量
        cout << "英雄名称：" << name << "  技能等级：" << skill << "  速度：" << speed <<  endl;
        cout << "该函数被调用了 " << counter << " 次" << endl;
        // speed = 50; //错误，常函数不能修改成员变量   ！！！
    }
    //普通函数
    void upgradeSkill()
    {
        skill += 1;
        cout << "技能升级成功，当前技能等级：" << skill << endl;
    }
    Hero(string n, int s, int sp):name(n),skill(s),speed(sp) {} //成员初始化列表
private:
    string name;
    int skill;
    int speed;
    mutable int  counter; //mutable关键字修饰的成员变量，可以在常函数中修改
};
int main (){
    Hero h1{"盖伦",5,30};
    h1.showInfo(); //调用常函数
    h1.upgradeSkill(); //调用普通函数
    h1.showInfo(); //调用常函数
    const Hero h2{"提莫",3,40};
    h2.showInfo(); //调用常函数
    // h2.upgradeSkill(); //错误，常对象不能调用普通函数  违背了常对象的不可修改性原则
    return 0;
}