import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    img: ({ src, alt, width, height, ...props }) =>
      src &&
      alt &&
      width &&
      typeof width === "number" &&
      height &&
      typeof height === "number" ? (
        <ImageZoom
          {...props}
          src={src}
          alt={alt}
          width={width}
          height={height}
          placeholder="blur"
        />
      ) : (
        <img {...props} />
      ),
    Accordion: (props) => <Accordion {...props} />,
    Accordions: (props) => <Accordions {...props} />,
    Callout: (props) => <Callout {...props} />,
    File: (props) => <File {...props} />,
    Folder: (props) => <Folder {...props} />,
    Files: (props) => <Files {...props} />,
    InlineTOC: (props) => <InlineTOC {...props} />,
    Step: (props) => <Step {...props} />,
    Steps: (props) => <Steps {...props} />,
    Tab: (props) => <Tab {...props} />,
    Tabs: (props) => <Tabs {...props} />,
    TypeTable: (props) => <TypeTable {...props} />,
  };
}
