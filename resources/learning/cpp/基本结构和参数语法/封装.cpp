#include <iostream>
#include <string>
using namespace std;

//面向对象三大特性：封装、继承、多态
//封装：将数据和操作数据的函数绑定在一起，形成一个整体，称为类

/*
封装的语法：
class 类名
{
    访问权限说明符:
        成员变量;
        成员函数;
};
访问权限说明符有三种：
    public: 公有权限，可以在类的外部访问
    private: 私有权限，只能在类的内部访问，子类不可以访问， 外部无法访问
    protected: 受保护权限，只能在类的内部和子类中访问，外部无法访问
*/


//和结构体不一样，结构体只能封装数据，类可以封装数据和函数
class Hero {
public: //公有权限
    //成员变量   --属性
    string name;
    int age;

    //成员函数  --行为
    void showInfo()
    {
        cout << "姓名：" << name << " 年龄：" << age << endl;
    }
};


class Person {   //父类 --基类
private: //私有权限
    string name;
    int age;  
protected: //受保护权限
    string address;

public:
    void setInfo(string n, int a)
    {
        name = n;
        age = a;
    }   

    void showInfo()
    {
        cout << "姓名：" << name << " 年龄：" << age << endl;
    }  

private:
    void func1()
    {
        //私有权限，类的内部可以访问
        name = "李四";
        age = 25;
    }
protected:
    void func2()
    {
        //受保护权限，类的内部可以访问
        name = "王五";
        age = 28;
    }
};

class son : public Person {   //继承 Person类 son类是Person类的子类--派生类
public: 
    void func()
    {
        //name = "张三"; //错误，私有权限，子类无法访问
        //age = 20;     //错误，私有权限，子类无法访问
        address = "北京市"; //正确，受保护权限，子类可以访问
        showInfo(); //正确，公有权限，子类可以访问
        setInfo("赵六", 22); //正确，公有权限，子类可以访问
        func2(); //正确，受保护权限，子类可以访问
        // func1(); //错误，私有权限，子类无法访问
    }

};

int main()
{
    //创建类的对象--实例化
    Hero h1;
    //通过对象访问成员变量和成员函数
    h1.name = "盖伦";
    h1.age = 30;
    h1.showInfo();

    return 0;
}