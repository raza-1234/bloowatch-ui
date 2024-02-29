import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../../client/components/shared/Footer';

describe("Footer", () => {

  it("should render successfully", () => {
    render(<Footer/>);

    const footer = screen.getByTestId("footer");
    const footer__wrapper = screen.getByTestId("footer__wrapper");
    const footer_column = screen.getAllByTestId("footer-col");

    expect(footer_column).toHaveLength(4);
    expect(footer).toBeInTheDocument();
    expect(footer__wrapper).toBeInTheDocument();
    expect(footer).toHaveClass("bloowatch-footer");
  })

  it("should render headings that contains footer headings content respectively", () => {
    render(<Footer/>);

    const headings = screen.getAllByRole("heading");
    
    expect(headings[0]).toHaveTextContent("About");
    expect(headings[1]).toHaveTextContent("Contact");
    expect(headings[2]).toHaveTextContent("Useful Links");
    expect(headings[3]).toHaveTextContent("Instagram");
  })

  it("should render paragraphs that contains footer text content respectively", () => {
    render(<Footer/>);

    expect(screen.getByTestId("bloowatch_text")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toHaveTextContent("156-677-124-442-2887wave@bloowatch.comSpain");
    expect(screen.getByTestId("pages")).toHaveTextContent("About us History Contact us");
  })

  it("should render images", () => {
    const imagesPath = [ 
      "http://localhost/instagram-1.png", 
      "http://localhost/instagram-3.png", 
      "http://localhost/instagram-4.png"
    ]
    const imagesAltText = [
      "insta-pic1",
      "insta-pic2",
      "insta-pic3",
    ]
    render(<Footer/>);

    const imageContainer = screen.getByTestId("images");
    const images = screen.getAllByRole("img");

    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).toHaveClass("bloowatch-footer__insta-images");

    for (let i = 0; i < images.length; i++){      
      expect(images[i]).toHaveProperty("alt", imagesAltText[i]); 
      expect(images[i]).toHaveProperty("src", imagesPath[i]); 
    }
  })

})