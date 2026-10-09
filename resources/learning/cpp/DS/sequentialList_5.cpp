/*
桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。

示例 1：
输入：[4,2,1]
输出：4

解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，总共 4 次即可拿完。

示例 2：
输入：[2,3,10]
输出：8

限制：
1 <= n <= 4
1 <= coins[i] <= 10
*/

#include <iostream>
using namespace std;

struct SequentialList{
    int *elements;
    int size;
    int capacity;
};

void initialize(SequentialList *list,int capacity){
    list->elements = new int[capacity];
    list->size = 0;
    list->capacity =capacity;
}

void insertElement(SequentialList *list,int index, int element){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    if(list->size == list->capacity){
        int newCapacity =list->capacity *2;
        int *newElements = new int[newCapacity];
        for(int i=0;i<list->size;++i){
            newElements[i]=list->elements[i];
        }
    }
    for(int i=list->size;i>index;--i){
        list->elements[i]=list->elements[i-1];
    }
    list->elements[index]=element;
    list->size++;
}



int main(){
    int n;
    while(cin >> n){
        SequentialList list;
        initialize(&list,n);
        int count=0;
        for(int i=0;i<n;++i){
            int num;
            cin >> num;
            insertElement(&list,i,num);
            // count +=num/2+num%2;
            count += (num + 1) / 2;
        }
        cout << count << endl;
    }
    return 0;
}