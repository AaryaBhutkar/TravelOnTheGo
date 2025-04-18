import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import CustomPopUp from "./CustomPopUp";

// Custom icons
const restaurantIcon = new L.Icon({
  iconUrl: require('../images/food_6350232.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const shoppingIcon = new L.Icon({
  iconUrl: require('../images/shopping.png'),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const landmarkIcon = new L.Icon({
  iconUrl: require('../images/landmark.png'), // Add this icon to your images folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const leisureIcon = new L.Icon({
  iconUrl: require('../images/leisure.png'), // Add this icon to your images folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const historicalIcon = new L.Icon({
  iconUrl: require('../images/historical.png'), // Add this icon to your images folder
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Mappu = () => {
  const mapRef = useRef(null);
  
  // Restaurant locations with accurate coordinates
  const locations = [
    {
      name: "Pizza By the Bay",
      position: [18.9324, 72.8268],
      address: "143, Soona Mahal, Marine Drive, Churchgate, Mumbai 400020",
      imageSrc: "https://im.whatshot.in/img/2021/Dec/132078749-3622549611156992-47733037240185069-n-cropped-1639479999.jpg",
      type: "restaurant"
    },
    {
      name: "Woodside Inn – Bandra",
      position: [19.0619, 72.8337],
      address: "Dheeraj Pali Arcade, Dr Ambedkar Road, Pali Hill, Bandra West, Mumbai 400050",
      imageSrc: "https://b.zmtcdn.com/data/pictures/9/18353639/4ad6a5b5a56fc11a69c52c56ab01451b.jpeg",
      type: "restaurant"
    },
    {
      name: "Pritam Da Dhaba",
      position: [19.0174, 72.8437],
      address: "Swami Ganjivandas Marg, Dadar East, Mumbai 400014",
      imageSrc: "https://b.zmtcdn.com/data/pictures/4/32264/bfbe3b149365a08ea915a4982c136c8f.jpg",
      type: "restaurant"
    },
    {
      name: "Tea Villa Cafe",
      position: [18.9678, 72.8054],
      address: "Shop No 1, Ground Floor, Back Bay View Building, 3 A New Queens Road, Charni Road, Mumbai 400004",
      imageSrc: "https://images.jdmagicbox.com/comp/mumbai/l7/022pxx22.xx22.210601121608.w4l7/catalogue/chaayos-churchgate-mumbai-chaayos-po976jh2wj.jpg",
      type: "restaurant"
    },
    {
      name: "CANDIES",
      position: [19.0543, 72.8344],
      address: "Mac Ronells, St Andrews Road, Bandra West, Mumbai 400050",
      imageSrc: "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/h/d/p20250-145693306856cd9abc0a20a.jpg",
      type: "restaurant"
    },
    {
      name: "Dadar Social",
      position: [19.0184, 72.8388],
      address: "Janta Industrial Estate, Senapati Bapat Marg, Lower Parel, Mumbai 400013",
      imageSrc: "https://b.zmtcdn.com/data/pictures/chains/9/18430809/c501ca48a9c4f59a0233590c06048a02.jpg",
      type: "restaurant"
    },
    {
      name: "Café Mondegar",
      position: [18.9219, 72.8325],
      address: "Metro House, 5-A Shahid Bhagat Singh Road, Colaba, Mumbai 400001",
      imageSrc: "https://media-cdn.tripadvisor.com/media/photo-s/16/c7/6e/69/cafe-mondegar.jpg",
      type: "restaurant"
    },
    {
      name: "Sea Lounge",
      position: [18.9218, 72.8332],
      address: "The Taj Mahal Palace, Apollo Bunder, Colaba, Mumbai 400001",
      imageSrc: "https://media-cdn.tripadvisor.com/media/photo-s/13/e1/90/a9/sea-lounge.jpg",
      type: "restaurant"
    },
    {
      name: "Bay View Café",
      position: [18.9157, 72.8214],
      address: "Hotel Harbour View, Kerawala Chamber, J P Ramchandani Marg, Colaba, Mumbai 400005",
      imageSrc: "https://b.zmtcdn.com/data/pictures/3/44023/f24f2ed8bafd18468f6c686d8a8805df.jpg",
      type: "restaurant"
    },
    {
      name: "Fab Cafe",
      position: [19.0652, 72.8297],
      address: "Plot 217, 16th Road, Bandra West, Mumbai 400050",
      imageSrc: "https://b.zmtcdn.com/data/pictures/1/18794881/3c1a902f4ba5fcb9bb3d8e06531a0c47.jpg",
      type: "restaurant"
    },
    {
      name: "Salt Water Cafe",
      position: [19.0641, 72.8330],
      address: "Rose Minar Annexe, 87 Chapel Road, Bandra West, Mumbai 400050",
      imageSrc: "https://b.zmtcdn.com/data/pictures/4/42854/d8a7b3bd86c20bd341079320e042c34b.jpg",
      type: "restaurant"
    },
    {
      name: "Bastian Bandra",
      position: [19.0577, 72.8309],
      address: "B/1, New Kamal Building, Linking Road, Bandra West, Mumbai 400050",
      imageSrc: "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/01/07170924/Bastian-Worli-Interiors-293948-1024x683.jpg",
      type: "restaurant"
    },
    {
      name: "Grandmama's Cafe",
      position: [19.0625, 72.8342],
      address: "5, Jeet Villa, Corner of Hill Road, Pali Hill, Bandra West, Mumbai 400050",
      imageSrc: "https://b.zmtcdn.com/data/pictures/0/18413870/1254d192735c490122d3798ad59bebfc.jpeg",
      type: "restaurant"
    },
    {
      name: "Shopping at Colaba",
      position: [18.9194, 72.8308],
      address: "Colaba Causeway, Colaba, Mumbai 400005",
      imageSrc: "https://www.mumbailive.com/images/media/images/images_1580189719523_causeway.jpg?bg=6a543d&crop=485%2C272.280701754386%2C0%2Cnull&fit=crop&fitToScale=w%2C1368%2C768&fm=webp&h=606.3157894736842&height=326&w=1080&width=485",
      type: "shopping"
    },
    {
      name: "Gateway of India",
      position: [18.9220, 72.8347],
      address: "Apollo Bandar, Colaba, Mumbai, Maharashtra 400001",
      imageSrc: "https://s7ap1.scene7.com/is/image/incredibleindia/gateway-of-india-mumbai-maharashtra-2-attr-hero",
      type: "landmark"
    },
    {
      name: "Marine Drive",
      position: [18.9425, 72.8234],
      address: "Netaji Subhash Chandra Bose Road, Mumbai",
      imageSrc: "https://images.wanderon.in/blogs/new/2024/04/marine-drive-2.jpg",
      type: "leisure"
    },
    {
      name: "Juhu Beach",
      position: [19.0948, 72.8258],
      address: "Juhu Beach, Mumbai",
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Juhu_Beach_Mumbai.jpg",
      type: "leisure"
    },
    {
      name: "Bandra Worli Sea Link",
      position: [19.0296, 72.8186],
      address: "Bandra Worli Sea Link, Mumbai",
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bandra_Worli_Sea_Link_nocturnal.jpg",
      type: "landmark"
    },
    {
      name: "Elephanta Caves",
      position: [18.9633, 72.9315],
      address: "Elephanta Island, Mumbai Harbour",
      imageSrc: "https://magicalmumbaitours.com/wp-content/uploads/2024/10/qj62nh68fativk30jny3i6osrzgw_1524229348_Elephanta_caves.webp",
      type: "historical"
    },
    {
      name: "Bandstand Promenade",
      position: [19.0428, 72.8195],
      address: "B.J. Road, Bandra West",
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Bandra_Bandstand_joggers.jpg/1200px-Bandra_Bandstand_joggers.jpg",
      type: "leisure"
    },
    {
      name: "Trishna Restaurant",
      position: [18.9321, 72.8331],
      address: "Sai Baba Marg, Kala Ghoda, Fort",
      imageSrc: "https://b.zmtcdn.com/data/pictures/8/37008/f9cbada8bfb7a1a55062c8864bb35056.jpg",
      type: "restaurant"
    },
    {
      name: "Phoenix Palladium",
      position: [18.9947, 72.8250],
      address: "462, Senapati Bapat Marg, Lower Parel",
      imageSrc: "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/11/The-Exterior-View-of-Palladium-Mall-Mumbai_0_1200.jpg",
      type: "shopping"
    },
    {
      name: "Linking Road",
      position: [19.0633, 72.8361],
      address: "Linking Road, Bandra West",
      imageSrc: "https://images.jdmagicbox.com/comp/mumbai/p5/022pxx22.xx22.191204191522.e5p5/catalogue/linking-road-market-khar-west-mumbai-63i0nsnqco-250.jpg?clr=#142952",
      type: "shopping"
    }
  ];

  // Function to get the appropriate icon based on location type
  const getIcon = (type) => {
    switch(type) {
      case 'restaurant':
        return restaurantIcon;
      case 'shopping':
        return shoppingIcon;
      case 'landmark':
        return landmarkIcon;
      case 'leisure':
        return leisureIcon;
      case 'historical':
        return historicalIcon;
      default:
        return restaurantIcon;
    }
  };

  return (
    <MapContainer 
      center={[19.0760, 72.8777]} // Centered on Mumbai
      zoom={12} 
      ref={mapRef} 
      style={{height: "100vh", width: "100vw"}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {locations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.position} 
          icon={getIcon(location.type)}
        >
          <Popup>
            <CustomPopUp 
              className="custom-popup-image" 
              imageSrc={location.imageSrc} 
              imageAlt={location.name} 
              title={location.name} 
              address={location.address}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Mappu;