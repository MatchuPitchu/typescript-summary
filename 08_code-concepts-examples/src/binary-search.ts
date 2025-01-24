/**
 * Big O = O(log(n))
 *
 * Needs a sorted array to work properly.
 */
const binarySearchService = () => {
  let totalSteps = 0;

  return <T>(arr: T[], target: T) => {
    const index = {
      left: 0,
      middle: Infinity,
      right: arr.length - 1,
    };

    while (index.left <= index.right) {
      totalSteps++;

      index.middle = Math.floor((index.left + index.right) / 2);
      const middleValue = arr[index.middle];

      if (!middleValue) break;

      if (target === middleValue) {
        return { result: index.middle, totalSteps };
      }

      if (target < middleValue) {
        index.right = index.middle - 1;
      }

      if (target > middleValue) {
        index.left = index.middle + 1;
      }
    }

    return { result: -1, totalSteps };
  };
};

const EXAMPLE_DATA = [-10, 2, 5, 11, 50, 54, 95, 110, 120];
const SORTED_ARRAY_OF_NUMBERS = [1, 2, 3, 4, 9, 12, 50, 234];

const binarySearch = binarySearchService();
const { result, totalSteps } = binarySearch(EXAMPLE_DATA, 120);
console.log(`Result: ${result}`, `Steps: ${totalSteps}`);
