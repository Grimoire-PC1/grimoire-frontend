import { CardBody, CardRoot,Flex,Text } from "@chakra-ui/react"

export const PinnedDiaryListCard = () => {
    const title = 'Titulo da minha sessao muito muito muito muito muito muito muito muito muito longa'
    const date = '31/02/99'
    
    return(
        <div className="">
            <CardRoot mt={"2%"} cursor={"pointer"}>
                <CardBody className="text">
                    <Flex placeContent={"space-between"} gapX={8}>
                    <Text lineClamp={1}>{title}</Text> 
                    <Text>{date}</Text>
                    </Flex>
                </CardBody>
            </CardRoot>
        </div>
    )
}