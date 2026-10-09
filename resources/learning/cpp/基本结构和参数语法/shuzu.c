
#include<stdio.h>

int main()

{

int a[5];

printf("%d\n",a);   //指向第一个数组元素的首地址            1245036

printf("%d\n",&a);        //指向整个数组的地址                 1245036

printf("%d\n",a + 1);            //a[1]元素的地址                               1245040

printf("%d\n",&a + 1);         //整个数组的字节长度4*5=20           1245056

printf("%d\n",&a[0] + 1);  //下一个元素的地址，下一个门牌号  1245040

printf("%d\n",sizeof(a));

printf("%d\n",sizeof(&a));

 

return 0;

}