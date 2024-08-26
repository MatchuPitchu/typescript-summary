const libs = ['react', 'react', 'vue', 'angular'];
const uniqueLibs = new Set(libs);

const hasReact = uniqueLibs.has('react');
uniqueLibs.delete('angular');
uniqueLibs.add('solid'); // ✅ [ 'react', 'vue', 'solid']
