#include <iostream>
using namespace std;

//指针引用  *&
/*
test1函数中调用allocMemory1函数时，传入的是指针p的副本（因为参数是char *ptr，即指针按值传递）。
在allocMemory1内部，对ptr重新赋值（ptr=new char[bytes]）只是修改了局部变量ptr的指向，而不会影响test1中的p。
所以test1中的p仍然是nullptr，输出为0。
*/

void allocMemory1(char *ptr,int bytes){
    ptr=new char[bytes]; //非法，ptr是指针的引用，其本身是常量，不能修改指向,只修改了局部副本
    cout<< "Inside allocMemory1, ptr的地址为: " << &ptr << endl;
}
void test1(){
    char *p=nullptr;
    allocMemory1(p,5); //无法分配内存，p仍然是nullptr
    cout<< (void*)p <<endl; //不转换为void*会打印字符地址对应的字符串，程序会崩溃
    cout<< "Inside test1, p的地址为: " << &p << endl;
}


void allocMemory2(char *&ptr,int bytes){
    ptr=new char[bytes]; //合法，ptr是指针的引用，可以修改指向,是修改了传入的实参p
    cout<< "Inside allocMemory2, ptr的地址为: " << &ptr << endl;
}

void test2(){
    char *p=nullptr;
    allocMemory2(p,5); //成功分配内存，p指向新分配的内存
    cout<< (void*)p <<endl; //打印分配的内存地址
    cout<< "Inside test2, p的地址为: " << &p << endl;   
}


int main(){
    test1(); //打印nullptr，因为内存没有分配成功，所以输出为0
    test2(); //打印分配的内存地址 
    return 0;
}