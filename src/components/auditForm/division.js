import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
// import streets from 'china-division/dist/streets.json';


// streets.forEach((street)=>{
//     const matchStreet = areas.filter(area => area.code === street.cityCode)[0];
//     if (matchStreet) {
//         matchStreet.children = matchStreet.children || [];
//         matchStreet.children.push({
//           label: street.name,
//           value: street.code,
//         });
//       }
// });

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    });
  }
});

const options = provinces.map(province => ({
  label: province.name,
  value: province.code,
  children: province.children,
}));

export default options;