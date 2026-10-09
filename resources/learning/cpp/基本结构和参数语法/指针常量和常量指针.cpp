#include <iostream>
using namespace std;
int main(){

    // 空指针不能解引用
    // int *p= NULL;
    // cout << *p <<endl;


    //野指针，不知道具体地址的内容也不能解引用
    // int *p= 0x2312;
    // cout << *p <<endl;

    //const 和 指针
    int a = 1;
    int b = 2;
    cout << "指针常量" << endl;
    // int* const p =&a; //指针的值为一个常量
    // p =&b; //会报错，因为常量不可改变
    // *p = 6 ; //不会报错，因为只是地址不可以改变，但是内部的值可以改变

    cout << "常量指针" << endl;
    const int*p =&a;
    p =&b; //会报错，因为常量不可改变
    // *p = 6 ; //会报错，因为常量不可改变

    //常量指针常量
    const int* const p =&a;

    
    return 0;
}