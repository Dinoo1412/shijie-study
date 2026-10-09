#include <iostream>
using namespace std;

void func(int a,int b,int c, double d){
    cout <<"func1 "<< "+ "<< a << endl;
}


void func1(int a,int b,int c, double d){
    cout <<"func2 "<< "+ "<< a << endl;
}

// void (*fptr1)(int a,int b,int c, double d);
// void (*fptr2)(int a,int b,int c, double d);

//函数指针类型的定义
typedef void (*fptr)(int a,int b,int c, double d);

//函数指针类型数组的定义
typedef void (*fptrs[])(int a,int b,int c, double d);
typedef void (*fptrc)(int a,int b,int c, double d);


int main(){
    //显然太麻烦
    // fptr1=func;
    // fptr1(2,3,4,5.0);
    // fptr2=func;
    // fptr2(3,3,4,5.0);


    //将变量名变为类型名
    fptr fptr1 = func;
    fptr1(2,3,4,5.0);
    fptrs fps={func,func1};
    ////函数指针类型数组的定义--第二种方式
    fptrc fp[]={func,func1};





    return 0;
}