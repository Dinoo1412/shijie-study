#include <iostream>
using namespace std;

//局部变量在栈上分配，函数返回后栈空间被回收，返回的指针指向无效内存，可能导致未定义行为。
char *func1(){
    char c[20]="chen";
    return c;
}


void test(int a, int b){
    int c;
    int d;
    cout << "形式参数a的地址是："<<&a<<endl;
    cout << "形式参数b的地址是："<<&b<<endl;
    cout << "局部变量c的地址是："<<&c<<endl;
    cout << "局部变量d的地址是："<<&d<<endl; 

}

int main(){


    //会报野指针错误
    // cout << func1() << endl; 
    //原因：chen作为一个字符串常量是存储在全局变量之中的，但是c[20]作为一个局部变量
    //存储在函数之中，函数都是存放在栈区当中，即用即销毁，所以当在main当中调用时，内存已经销毁，出现野指针错误
    //返回了局部变量的地址，内存坏掉了
    test(1,2);

    return 0;

}