/*
小A 和 小B 在玩猜数字。小B 每次从 1, 2, 3 中随机选择一个，小A 每次也从 1, 2, 3 中选择一个猜。他们一共进行三次这个游戏，请返回 小A 猜对了几次？
输入的guess数组为 小A 每次的猜测，answer数组为 小B 每次的选择。guess和answer的长度都等于3。

示例 1：
输入：guess = [1,2,3], answer = [1,2,3]
输出：3
解释：小A 每次都猜对了。
 

示例 2：
输入：guess = [2,2,3], answer = [3,2,1]
输出：1
解释：小A 只猜对了第二次。
 

限制：
guess的长度 = 3
answer的长度 = 3
guess的元素取值为 {1, 2, 3} 之一。
answer的元素取值为 {1, 2, 3} 之一。
*/

#include <iostream>
using namespace std;

struct SequentialList{
    int* elements;
    int size;
    int capacity;
};

void initialize(SequentialList *list, int capacity){
    list->elements =new int[capacity];
    list->size =0;
    list->capacity =capacity; 
}
void insertElement(SequentialList *list,int index, int element){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    if(list->size == list->capacity){
        int newCapacity = list->capacity *2;
        int *newElements =new int[newCapacity];
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
    SequentialList guessList;
    SequentialList answerList;  
    initialize(&guessList,3);
    initialize(&answerList,3);
    for(int i=0;i<3;++i){
        int guessNum;
        cin >> guessNum;
        insertElement(&guessList,i,guessNum);
    }
    for(int i=0;i<3;++i){
        int answerNum;
        cin >> answerNum;
        insertElement(&answerList,i,answerNum);
    }
    int correctCount=0;
    for(int i=0;i<3;++i){
        if(guessList.elements[i]==answerList.elements[i]){
            correctCount++;
        }
    }
    cout << correctCount << endl;
    return 0;
}