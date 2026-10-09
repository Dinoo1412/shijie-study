#include <iostream>
using namespace std;

//引用适用于多个值返回
int countAddSum(int a[],int size,int target,int& count){
    int sum = 0;
    for(int i=0;i<size;++i){
        sum+=a[i];
        if(a[i]==target){
            count++;
        }
    }
    return sum;
}

//特殊情况--在C++中结构体是通过拷贝的方式返回的
struct Person{
    string name;
    int age;
    int a[1000];
};

void printPerson(Person p){
    cout << "name: " << p.name << " age: " << p.age << p.a << endl;
}
//如果不采用引用传递的话，结构体会被完整的拷贝一份，效率低下
//引用传递 可以避免拷贝开销 将传参的参数地址传递过去，保证是同一份数据（地址），提高效率
void printPersonRef(const Person& p){
    cout << "name: " << p.name << " age: " << p.age << p.a << endl;
}

int main(){
    int arr[]={1,2,3,4,5,3,6,3,7,8};
    int size=sizeof(arr)/sizeof(arr[0]);
    int target=3;
    int count=0;
    int sum=countAddSum(arr,size,target,count);
    cout << "数组元素和是：" << sum << endl;
    cout << "目标元素出现的次数是：" << count << endl;
}