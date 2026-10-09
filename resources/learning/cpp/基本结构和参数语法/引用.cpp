#include <iostream>
using namespace std;

/*
引用：给变量取一个别名   和指针的实际的运用效果非常像
&
数据类型& 变量名 = 变量

什么时候用？当变量名非常非常长的时候可以用来取别名
*/

int main(){
    int a=1314;
    int &b=a;
    b=530;
    cout<<"a=  " << a << endl;
    cout<<"b=  " << b << endl; 
    int a_very_very_very_long[8]={1,2,3};
    int &pre1=a_very_very_very_long[0];
    

}