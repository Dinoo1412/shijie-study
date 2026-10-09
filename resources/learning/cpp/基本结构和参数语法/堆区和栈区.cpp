#include <iostream>
using namespace std;

//四区：代码区、全局区、栈区、堆区   //栈区和堆区的概念不同于数据结构的堆和栈 

//代码区：只读、共享   //运行起来之后无法修改 多个exe文件进程的代码区域是共享的
//全局变量、静态变量、字符串常量、全局常量

//栈区只由操作系统决定生命周期
//堆区内存由程序员自定义生命周期，函数参数和局部变量
int g_a=1;
int g_b=2;
const int g_c =3;
const int g_d =4;

int main(){

    int a=1;
    int b=2;
    cout<<"全局变量g_a的地址是"<<&g_a<<endl;
    cout<<"全局变量g_b的地址是"<<&g_b<<endl;
    //全局变量存储在全局变量之中，局部变量存储在栈区之中，所以地址前缀不一样
    cout<<"局部变量a的地址是"<<&a<<endl;
    cout<<"局部变量b的地址是"<<&b<<endl;

    //静态变量   静态变量和全局变量存放在一起全局区域
    static int c =4;
    static int d =5;
    cout<<"静态变量c的地址是"<<&c<<endl;
    cout<<"静态变量d的地址是"<<&d<<endl;

    //字符串常量  也是存在全局区域中
    cout<<"字符串常量chen的地址是"<<&"chen"<<endl;

    //局部常量  存放在栈区中
    const int e =6;
    const int f =7;
    cout<<"局部常量e的地址是"<<&e<<endl;
    cout<<"局部常量f的地址是"<<&f<<endl;

    //全局常量  存放在全局区域中
    cout<<"全局常量g_c的地址是"<<&g_c<<endl;
    cout<<"全局常量g_d的地址是"<<&g_d<<endl;

    return 0;
}