#include <iostream>
using namespace std;

int getValue(int a[],int index) {

    return a[index];

}

int& getValueRef(int a[], int index) {
    return a[index];
}

/*
如果我想要修改这个数组的值，可以怎么做？  本质上就是引用相同地址的值
你可以通过传递数组的引用或者使用指针来修改数组的值。下面是一个示例，展示了如何通过指针修改数组中的值：
void setValue(int* a, int index, int value) {
    a[index] = value;
}
或者者通过引用传递数组：
void setValue(int (&a)[5], int index, int value) {
    a[index] = value;
}
或者引用整个函数
int& getValueRef(int a[], int index) {
    return a[index];
}

*/


int main() {
    int a[5] = {1, 2, 3, 4, 5};
    cout << getValue(a, 2) << endl; // Outputs: 3
    getValueRef(a, 2) = 10; // 修改数组中的值
    cout << getValueRef(a, 2) << endl; // Outputs: 10  a[2]=999;
    return 0;
}