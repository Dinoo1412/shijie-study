#include <iostream>
#include <string>
#include <cstring>
using namespace std;

//联合体的应用——用于选择显示信息，节省内存资源空间

//background:如果是老师就只考虑课程，如果是学生就只考虑成绩

struct Info
{
    char _name[20];
    int _role;
    union{
        double score;
        char course[20];
    }_sc;
    // 在结构体内嵌套一个函数 ，是方便后续主函数看起来不那么冗杂——字符数组到字符串的转换
    Info(const char name[20],int role, double s, const char c[20]){
        strcpy(_name,name); // 字符串复制函数，复制姓名参数 因为是常量
        //数组类型不能直接赋值：_name是字符数组char[20]，而name也是字符数组。在C++中，数组类型不能直接用=运算符相互赋值
        _role=role;
        if(s>0)_sc.score=s;
        if(strlen(c)>0) strcpy(_sc.course,c);
    }

};



int main(){
    Info a[4]={
        Info("周老师",0,-1,"C++"),
        Info("周老师",0,-1,"python"),
        Info("周同学1",1,90,""),
        Info("周同学2",1,88,""),
    };
    for (int i=0;i<4;++i){
        if(a[i]._role == 0){
            cout << a[i]._name << "是老师" << "，教" << a[i]._sc.course << endl;
        }
        else if(a[i]._role == 1){
            cout << a[i]._name << "是学生，分数是" << a[i]._sc.score << endl;
        }
    }

    return 0;
}
