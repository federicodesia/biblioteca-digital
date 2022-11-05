import { Box, IconButton, IconButtonProps } from "@chakra-ui/react"
import { ReactNode } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

interface Props {
    items: ReactNode[]
}

const CustomCarousel = ({ items }: Props) => {
    return <Box rounded='xl' overflow='hidden'>
        <Carousel
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            renderArrowPrev={(clickHandler: () => void) => {
                return <Box
                    position='absolute'
                    top='50%'
                    left='0'
                    transform='translate(0%, -50%)'
                    zIndex='1'>
                    <CarouselButton
                        aria-label='Back'
                        icon={<IoChevronBack />}
                        ml='4'
                        onClick={clickHandler} />
                </Box>
            }}
            renderArrowNext={(clickHandler: () => void) => {
                return <Box
                    position='absolute'
                    top='50%'
                    left='100%'
                    transform='translate(-100%, -50%)'
                    zIndex='1'>
                    <CarouselButton
                        aria-label='Next'
                        icon={<IoChevronForward />}
                        mr='4'
                        onClick={clickHandler} />
                </Box>
            }}>
            {
                items.map((item, itemIndex) => {
                    return <Box
                        key={`SliderItem ${itemIndex}`}>
                        {item}
                    </Box>
                })
            }
        </Carousel>
    </Box>
}

const CarouselButton = (props: IconButtonProps) => {
    return <IconButton
        h='48px'
        w='48px'
        variant='ghost'
        color='white'
        _hover={{ bg: 'whiteAlpha.300' }}
        _active={{ bg: 'whiteAlpha.400' }}
        {...props} />
}

export default CustomCarousel