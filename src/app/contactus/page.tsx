import dynamic from "next/dynamic"

const ContactUs = dynamic(()=>import("seeksolution/components/contactus/ContactUs"), {ssr:false})

const contactus = ()=>{
    return(
        <ContactUs/>
    )
}
export default contactus