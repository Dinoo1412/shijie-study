#include <iostream>
using namespace std;
//  引用的特性 
//1.必须初始化
//2.初始化以后不可以修改  //而指针，除非是指针常量才不可以修改
//但其实引用的本质就是指针变量

int main(){
    // int &a; error写法
    int a=3,c=6;
    int& b=a;
    b=c; //赋值语句 b=6
    /*
    本质上一样，汇编代码一样
    int* const b=&a;
    *b=c;  解引用哈哈哈
    */
    cout << "a的值是" <<a <<"      b的值是" << b << endl; //都会被修改为6，因为b是a的别名
}