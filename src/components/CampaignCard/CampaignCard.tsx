import {CardBody, CardFooter, CardRoot, Image, Text } from "@chakra-ui/react"


export const CampaignCard = () => {
    return(
        <CardRoot className="margin-top" cursor={"pointer"}>
                <Image 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="max-h-[25vh]"
                />
            <CardBody>
                <Text fontSize={"lg"}>Cool Title</Text>
            </CardBody>
        </CardRoot>
    )
}