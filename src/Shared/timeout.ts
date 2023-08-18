/**
 * @description Function to make setTimeout with combination of async - await
 */
export const timeout: Function = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
