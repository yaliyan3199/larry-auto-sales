// Sample inventory. Edit this list to update the whole site.
// Images use Unsplash photo IDs. Replace with the dealership's own photos.
const U=(id,w=1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const PH='19563963860';
// Dealership location. Put the exact street address in `address` and `mapQuery` (e.g. '123 Main St, McAllen, TX 78501').
const DEALER={address:'',mapQuery:'Larry Auto Sale'};
const EXTRA=['photo-1503376780353-7e6692767b70','photo-1492144534655-ae79c964c9d7','photo-1544636331-e26879cd4d9b'];
const FEAT=['Bluetooth and USB','Backup camera','Cruise control','Air conditioning','Alloy wheels','Power windows and locks','Keyless entry','Touchscreen display'];
const cars=[
 {id:1,make:'Volkswagen',n:'Volkswagen Golf TSI',y:2019,mi:58000,f:'Gasoline',tr:'Automatic',eng:'1.4L Turbo 4-cyl',kl:'Gray',body:'Hatchback',p:16995,i:'photo-1494976388531-d1058494cdd8',tag:'New arrival'},
 {id:2,oldp:24500,make:'BMW',n:'BMW 330i Sedan',y:2018,mi:72000,f:'Gasoline',tr:'Automatic',eng:'2.0L Turbo 4-cyl',kl:'Black',body:'Sedan',p:22900,i:'photo-1555215695-3004980ad54e'},
 {id:3,oldp:26495,make:'Audi',n:'Audi Q5 Premium',y:2017,mi:81000,f:'Gasoline',tr:'Automatic',eng:'2.0L Turbo 4-cyl',kl:'White',body:'SUV',p:23995,i:'photo-1606664515524-ed2f786a0bd6',tag:'Price drop'},
 {id:4,oldp:21950,make:'Mercedes-Benz',n:'Mercedes-Benz C300',y:2016,mi:69000,f:'Gasoline',tr:'Automatic',eng:'2.0L Turbo 4-cyl',kl:'Silver',body:'Sedan',p:19950,i:'photo-1618843479313-40f8afb4b4d8'},
 {id:5,make:'Volvo',n:'Volvo XC60 T5',y:2018,mi:64000,f:'Gasoline',tr:'Automatic',eng:'2.0L Turbo 4-cyl',kl:'Gray',body:'SUV',p:27450,i:'photo-1519641471654-76ce0107ad1b'},
 {id:6,oldp:19995,make:'Honda',n:'Honda Civic EX',y:2020,mi:41000,f:'Gasoline',tr:'Automatic',eng:'1.5L Turbo 4-cyl',kl:'Red',body:'Sedan',p:18495,i:'photo-1552519507-da3b142c6e3d',tag:'New arrival'},
 {id:7,make:'Ford',n:'Ford F-150 XLT',y:2018,mi:76000,f:'Gasoline',tr:'Automatic',eng:'3.5L V6',kl:'Blue',body:'Truck',p:29900,i:'photo-1492144534655-ae79c964c9d7'},
 {id:8,make:'Toyota',n:'Toyota RAV4 LE',y:2019,mi:52000,f:'Gasoline',tr:'Automatic',eng:'2.5L 4-cyl',kl:'White',body:'SUV',p:24500,i:'photo-1544636331-e26879cd4d9b',tag:'Popular'}
];
