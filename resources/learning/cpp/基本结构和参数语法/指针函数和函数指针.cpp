#include <iostream>
using namespace std;


//指针函数
int *getArray(int a, int d, int n){

    int *ret= new int[n];
    for(int i=0;i<n;++i){
        ret[i] = a+i*d;
    }
    return ret;
}

//函数指针   --指向一个函数的指针，而不是变量
double (*ptr)(int a, int b, int c);
double func(int a, int b, int c){
    cout << a << "," << b << "," << c << endl;
    return 0.0;

}
void func1(int a, int b){
    cout << a << "," << b << endl;

}

int set_Array(int,int,int);


int main(){
    int *ans=getArray(5,3,6);
    for(int i=0;i<6;++i){
        cout<<ans[i]<<endl;
        cout<<*(ans+i)<<endl;//两者其实是一样的
    }
    ptr= func;
    ptr(4,5,6);
    set_Array(3,4,5);
    // ptr =func1; //会报错，因为指针和函数的结构必须对应

    return 0;

}

//普通函数   
int set_Array(int x, int y, int z){
    cout << x << "," << y << "," << z ;
    return 0;

}