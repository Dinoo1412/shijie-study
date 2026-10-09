/*

Problem Description
青年歌手大奖赛中，评委会给参赛选手打分。选手得分规则为去掉一个最高分和一个最低分，然后计算平均得分，请编程输出某选手的得分。
 

Input
输入数据有多组，每组占一行，每行的第一个数是n(2<n<=100)，表示评委的人数，然后是n个评委的打分。
 

Output
对于每组输入数据，输出选手的得分，结果保留2位小数，每组输出占一行。
*/

#include <iostream>
using namespace std;

struct SequentialList{
    double* elements;
    int size;
    int capacity;

};
void initialize(SequentialList *list ,int capacity){
    list->elements = new double[capacity];
    list->size =0;
    list->capacity=capacity;
}
void insertElement(SequentialList *list,int index,double element){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    if(list->size ==list->capacity){
        int newCapacity = list->capacity *2;
        double* newElements = new double[newCapacity];
        for(int i=0;i<list->size;++i){
            newElements[i]=list->elements[i];
        }
    }
    for(int i=list->size;i>index; --i){
        list->elements[i]=list->elements[i-1];
    }
    list->elements[index]=element;
    list->size++;

}
double getElement(SequentialList* list,int index){
    if(index<0 || index>list->size){
        throw std::invalid_argument("Invalid index");
    }
    return list->elements[index];
}
//太弱智了，压根不需要删除元素，只需要找到最大值和最小值然后计算总和即可
// void deleteElement(SequentialList *list,int index){
//     if(index<0 || index>list->size){
//         throw std::invalid_argument("Invalide index");
//     }
//     for(int i=index;i<list->size;++i){
//         list->elements[i]=list->elements[i+1];
//     }
// }

int main(){
    int n;
    while(cin >> n){
        SequentialList list;
        initialize(&list,n);
        for(int i=0;i<n;++i){
            double score;
            cin >> score;
            insertElement(&list,i,score);
        }
        double maxScore =getElement(&list,0);
        double minScore =getElement(&list,0);
        double totalScore = 0.0;
        double averageScore = 0.0;
        for(int i=0;i<list.size;++i){
            double score =getElement(&list,i);
            if(score >maxScore){
                maxScore =score;
            }
            if(score < minScore){
                minScore =score;
            }
            totalScore +=score;
        }
        totalScore = totalScore - maxScore - minScore;
        averageScore =totalScore/(n-2);
        printf("%.2f\n",averageScore);
         

    }
    return 0;
}