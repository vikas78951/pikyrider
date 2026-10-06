import { Image } from "expo-image"

const Logo = () => {
  return (
    <Image
      source={require("../../../assets/images/logo/logo.png")}
      style={{ width: '100%', height: 50 }}
      contentFit="contain"
    />
  )
}

export default Logo
