#include <iostream>
#include <string>
using namespace std;

//调试的方法：文件不能为中文命名 点击单行添加断点  后再在监视中增加想要观测的属性值  点击运行

//接口、方法、函数都是指类中的成员函数
//属性私有化可以帮助我们保护数据，防止外部随意修改数据，保证数据的安全性和完整性
//并且可以用公有的成员函数来控制对私有属性的访问方式，比如可以在设置属性值时进行合法性检查
//同时也可以设置有效性范围，防止属性被设置为无效值

class Hero {

public:
    void sertName(string n)
    {
        name = n; //设置名字
    }
    string getName()
    {
        return name; //获取名字
    }

    int getSkill()
    {
       return skill; //获取技能值
    }
    void setSpeed(int s)
    {
        if(s <0 || s >100)
        {
            cout << "速度值设置错误，必须在0-100之间" << endl;
            return;
        }
        speed = s; //设置速度值
    }



private: //私有权限
        string name;  //可读可写
        int skill = 3;    //只读
        int speed;    //只写
};


int main()
{
    Hero h;
    // h.name = "盖伦"; //错误，私有权限，外部无法访问
    // h.skill = 100;   //错误，私有权限，外部无法访问
    // h.speed = 80;    //错误，私有权限，外部无法访问
    h.sertName("盖伦"); //正确，通过公有权限的成员函数设置名字
    cout << "英雄名字：" << h.getName() << endl; //正确，通过公有权限的成员函数获取名字
    h.getSkill(); //正确，通过公有权限的成员函数获取技能值
    cout << "英雄技能值：" << h.getSkill() << endl;
    h.setSpeed(-1); //正确，通过公有权限的成员函数设置速度值

    return 0;
}