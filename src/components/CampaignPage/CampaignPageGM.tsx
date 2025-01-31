import { Input, Text, Textarea, Image, Separator,} from "@chakra-ui/react";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "../ui/file-upload";

export interface CampaignPageGMProps {
    user: string;
    campaign: string; //depois mudar pra Campaign
}

export const CampaignPageGM = ({
    user,
    campaign,
}: CampaignPageGMProps) => {

    const campaign_image = "" //depois mudar pra pegar a imagem cadastrada na campanha

    return(
        <div className="overflow-y-auto">
            <Text className="subtitle-s">PERSONALIZE SUA HISTÓRIA</Text>
            <div className="grid grid-cols-2 place-items-stretch margin-top-xs h-[38vh]">
                <div className="">
                    {
                        campaign_image == "" ?
                        <FileUploadRoot w={"36vw"} h={"35vh"} alignItems="stretch" maxFiles={10}>
                            <FileUploadDropzone
                                label="Faça o upload da capa da sua campanha"
                                description=".png, .jpg até 5MB"
                            />
                            <FileUploadList />
                        </FileUploadRoot>
                        :
                        <Image w={"36vw"} h={"35vh"} className="bg-purple-950"></Image>
                    }
                </div>
                <div>
                    <Text className="text">Título</Text>
                    <Input></Input>
                    <Text className="text" mt={"5"}>Descreva sua história</Text>
                    <Textarea resize={"none"}></Textarea>
                </div>
            </div>
            <div className="grid grid-cols-28 margin-top-s">
                <div className="col-span-16">
                    <Text className="subtitle-s">HISTÓRICO DE SESSÕES</Text>
                    {/* aqui vem uma lista de PinnedDiaryListCard. clicar em um card abre um  */}
                </div>
                <Separator orientation={"vertical"} className="col-span-1"></Separator>
                <div className="col-span-11">
                    <Text className="subtitle-s text-center">PERSONAGENS DOS JOGADORES</Text>
                    {/* aqui vem uma lista de avatares dos jogadores. clicar neles */}
                </div>
            </div>
        </div>
    )
}