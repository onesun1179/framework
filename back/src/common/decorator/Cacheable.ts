export const CACHEABLE = Symbol('CACHEABLE');

// export function Cacheable(key: string, ttl?: number) {
//   return function (target: any, _key: string, descriptor: PropertyDescriptor) {
//     const methodRef = descriptor.value;
//
//     console.log(target, _key, descriptor);
//     // SetMetadata(CACHEABLE, {
//     //   key: '1',
//     //   ttl,
//     // });
//     descriptor.value = async function (...args: any[]) {
//       console.log(this); // TestService {}
//
//       // TypeError: Cannot read properties of undefined (reading 'get')
//       const value = await this.cache.get(key);
//       if (value) {
//         return value;
//       }
//
//       const result = await methodRef.call(this, ...args);
//       await this.cache.set(key, result, ttl);
//       console.log(result);
//       return result;
//     };
//   };
// }
