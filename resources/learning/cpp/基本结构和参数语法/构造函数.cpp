#include <iostream>
#include <string>
using namespace std;

//构造函数：在创建对象时自动调用，用于初始化对象的属性
/*
构造函数的特点：
1. 构造函数的名称必须与类名相同
2. 构造函数没有返回值类型，甚至没有void
3. 构造函数可以有参数，也可以没有参数
4. 如果没有定义构造函数，编译器会自动生成一个默认的无参数构造函数
5. 构造函数可以重载，可以有多个构造函数，参数列表必须不同
*/


class Hero {
public:
    //无参数的构造函数
    Hero() 
    {
        name = "无名氏";
        skill = 1;
        speed = 30;
        cout << "默认构造函数" << endl;
    }
    //带参数的构造函数
    Hero(string n,int s)
    {
        name = n;
        skill = s;
        speed = 40;
        cout << "带参数的构造函数" << endl;
    }
private:
    string name;
    int skill;
    int speed;
};

int main()
{
    Hero h1; //调用无参数的构造函数
    Hero h2("盖伦",5); //调用带参数的构造函数
    // Hero h3(); //注意：这不是调用无参数的构造函数，而是声明了一个函数，返回类型是Hero，函数名是h3，函数没有参数
    Hero h4{}; //调用无参数的构造函数
    Hero h5{"提莫",3}; //调用带参数的构造函数

    return 0;
}