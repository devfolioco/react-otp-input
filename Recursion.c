#include <stdio.h>
#include <string.h>
void reverse_string(char*, int, int);

int main()
{
    //This array would hold the string upto 150 char
    char string_array[150];
    printf("Enter any string:");
    scanf("%s", &string_array);
 
    //Calling our user defined function
    reverse_string(string_array, 0, strlen(string_array)-1);
    printf("\nReversed String is: %s",string_array);
 
    return 0;
}
 
void reverse_string(char *x, int start, int end)
{
    char ch;
    if (start >= end)
       return;
 
    ch = *(x+start);
    *(x+start) = *(x+end);
    *(x+end) = ch;
 
    //Function calling itself: Recursion
    reverse_string(x, ++start, --end);
}
