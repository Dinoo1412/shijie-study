#include <iostream>
using namespace std;

struct S {
    int x;
    mutable int y; // 使用mutable关键字
};
void printS(const S& s) {
    // s.x = 10; // 非法，不能修改常量引用的成员
    s.y = 20; // 合法，mutable成员可以被修改
    cout << "x: " << s.x << ", y: " << s.y << endl;
}

int main() {
    int a;
    const int &ref = a; // 合法，ref是a的常量引用
    // int &ref2 = 10; // 非法，不能将非常量引用
    //引用=指针常量  指针常量：指向某个地址的指针，其地址不可变，且指向的内存的值可以修改，本质是常量
    //常量引用=常量指针常量  

    S s = {1, 2};
    printS(s);
    return 0;
}