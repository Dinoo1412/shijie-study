#include <iostream>
using namespace std;


union DateU
{
    int i;  //4
    double d;  //8
    char s[10];  //10
};


int main(){
    cout << sizeof(DateU) << endl;  //打印出来的结果为16，因为最大对齐单位是8 ，所以要保证字节对齐
    DateU du;
    du.s[0]=255; //11111111
    du.s[1]=1;   //00000001
    du.s[2]=0;   //00000000
    du.s[3]=0;   //00000000
    cout << du.i << endl; //输出511
    // 00000000 00000000 00000001 11111111 相当于2^9-1=511
    cout <<(int)du.s[0]<<(int)du.s[1]<<(int)du.s[2]<<(int)du.s[3]<<endl;  //8位最多表示到0-255 
    //由于du.i 和 du.s[0]共享一个地址，所以255改变之后du.s肯定会变
    du.i=256;  // 00000000 00000000 00000001 00000000 256=2^8 
    cout <<(int)du.s[0]<<(int)du.s[1]<<(int)du.s[2]<<(int)du.s[3]<<endl;   //输出0100

    return 0;
}
