/*
Problem Description
给你n个整数，求他们中所有奇数的乘积。

Input
输入数据包含多个测试实例，每个测试实例占一行，每行的第一个数为n，表示本组数据一共有n个，接着是n个整数，你可以假设每组数据必定至少存在一个奇数。
 
Output
输出每组数中的所有奇数的乘积，对于测试实例，输出一行。
*/

#include <iostream>
#include <stdexcept>
using namespace std;

struct SequentialList{
    int* element;
    int size;
    int capacity;
};

void initializeList(SequentialList *list, int capacity){
    list->element =new int[capacity];
    list->size = 0;
    list->capacity = capacity;
}

void insertElement(SequentialList *list,int index,int element){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    if(list->size == list->capacity){
        int newCapacity = list->capacity *2;
        int* newElements = new int[newCapacity];
        for(int i=0;i<list->size;i++){
            newElements[i]=list->element[i];
        }
    }
}

int getElement(SequentialList *list,int index){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    return list->element[index];
}

int main(){
    int n;
    while(cin >> n ){  //添加while循环可以处理多组输入，方便运行
        SequentialList list;
        initializeList(&list,n);
        for(int i=0;i<n;i++){
            int num;
            cin >> num;
            insertElement(&list,i,num);
        }
        int prod=1;
        for(int i=0;i<list.size;i++){
            int val = getElement(&list,i);
            if(val % 2 ==1 ){
                prod *= val;
            }
        }
        cout << prod << endl;
    }

    return 0;
}