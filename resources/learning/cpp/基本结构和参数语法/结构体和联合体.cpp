#include <iostream>
using namespace std;

struct DateS
{
    int i;
    double d;
    char s[10];
};

union DateU
{
    int i;
    double d;
    char s[10];
};

//结构体和联合体构建非常相似，但是对于结构体来说，每一个成员都单独占有一个内存空间
// 是对于联合体来说，所有成员共用一片内存 空间

int main(){

    DateS ds;
    cout << &ds.i << "," << &ds.d << "," << &ds.s << endl; //(void *)ds.s也是可以强制转换地址的操作
    DateU du;
    cout << &du.i << "," << &du.d << "," << &du.s << endl;
    return 0;
}

//联合体的使用

/*
1、定义和使用分开
union DateU
{
    int i;
    double d;
    char s[10];
};
DateU a,b,c;
2、定义和使用结合
union DateU
{
    int i;
    double d;
    char s[10];
}a,b,c;

3、匿名：不想让别人使用
union 
{
    int i;
    double d;
    char s[10];
}a,b,c;
*/