#include <iostream>
using namespace std;

//多继承 --子类继承多个父类

class BaseA{
public:
    int A;
    int Base;
    BaseA():A(0),Base(1){}

};
class BaseB{
public:
    int B;
    int Base;
    BaseB():B(2),Base(3){}

};
class BaseC{
public:
    int C;
    BaseC():C(4){}

};

class Son : public BaseA, public BaseB, public BaseC{

};

int main(){
    Son s;
    s.A=1;
    s.B=2;
    s.C=3;
    // s.Base=4; 必须要明确--同名属性
    s.BaseA::Base=4;
    s.BaseB::Base=5;
    cout << sizeof(s)<<endl;  //输出20 ，因为继承了五个整数型的字段

    
    return 0;
}