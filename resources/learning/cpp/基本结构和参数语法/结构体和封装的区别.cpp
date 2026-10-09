#include <iostream>
#include <string>
using namespace std;

//结构体和类的区别
/*
1. 结构体只能封装数据，类可以封装数据和函数 
2. 结构体的成员默认是公有权限，类的成员默认是私有权限
3. 结构体一般用于封装简单的数据类型，类一般用于封装复杂的数据类型
4. 结构体也可以封装函数，C++可以定义，但是C语言不可以定义
*/
struct Student {
    string name;
    int age;

    void showInfo()
    {
        cout << "姓名：" << name << " 年龄：" << age << endl;
    }
};

class Hero {
    string name; //默认私有权限
    int age;
public:
    void showInfo()
    {
        cout << "姓名：" << name << " 年龄：" << age << endl;
    }
};
int main()
{
    //使用结构体
    Student stu;
    stu.name = "张三";
    stu.age = 18;
    stu.showInfo();

    //使用类
    Hero h;
    // h.name = "李四"; //错误，类的成员默认是私有权限，外部无法访问
    // h.age = 20; //错误，类的成员默认是私有权限，外部无法访问
    h.showInfo();

    return 0;
}