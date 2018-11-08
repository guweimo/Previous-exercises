def findRoot1(x, power, epsilon):
    low = 0
    high = 100
    ans = (low+high)/2.0
    while abs(ans ** power - x) >= epsilon:
        if ans ** power < x:
            low = ans
        else:
            high = ans
        ans = (low + high)/2.0
    return ans


def findRoot2(x, power, epsilon):
    if x < 0 and power %2 == 0:
        return None
    low = min(0,x)
    high = max(0,x)
    ans = (low+high)/2.0
    while abs(ans ** power - x) >= epsilon:
        if ans ** power < x:
            low = ans
        else:
            high = ans
        ans = (low + high)/2.0
    return ans


def findRoot3(x, power, epsilon):
    if x < 0 and power % 2 == 0:
        return None
    low = min(-1, x)
    high = max(1, x)
    ans = (low+high)/2.0
    while abs(ans ** power - x) >= epsilon:
        if ans ** power < x:
            low = ans
        else:
            high = ans
        ans = (low+high)/2.0
    return ans


