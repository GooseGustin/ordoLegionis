# def removeDuplicates(array): 
#     arrayCopy = array.copy()
#     for item in array: 
#         if arrayCopy.count(item) > 1: 
#             arrayCopy.remove(item)
#     return arrayCopy

def removeDuplicates(arr): 
    for i in arr.copy(): 
        if arr.count(i) > 1:
            arr.remove(i)
    return arr