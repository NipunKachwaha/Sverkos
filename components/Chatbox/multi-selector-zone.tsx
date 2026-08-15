"use client";

import React from "react";
import { MultiSelect } from "@/components/Chatbox/multi-selector";
import {
    SiReact,
    SiNextdotjs,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiRemix,
    SiAstro,
    SiGatsby,
    SiExpress,
    SiFastify,
    SiNestjs,
    SiDjango,
    SiFlask,
    SiLaravel,
    SiRubyonrails,
    SiSpringboot,
    SiFlutter,
    SiReactrouter,
    SiTailwindcss,
    SiJquery,
    SiGin,
    SiElectron,
    SiSolid,
    SiQwik,
    SiPhoenixframework,
    SiCodeigniter,
    SiZend,
    SiCakephp,
    SiDotnet,
    SiPhp,
    SiGo,
    SiRust,
    SiPerl,
    SiPostgresql,
    SiMongodb,
    SiMysql,
    SiRedis,
    SiRubygems,
    SiKotlin,
    SiSpring,
    SiCplusplus,
    SiC,
    SiScala,
    SiElixir,
    SiHaskell,
    SiJulia,
    SiTypescript,
    SiJavascript,
    SiKubernetes,
    SiDocker,
    SiTensorflow,
    SiPytorch,
    SiFastapi,
    SiMeteor,
    SiBackbone,
    SiSymfony,
    SiBulma,
    SiChakraui,
    SiBootstrap,
    SiRedux,
    SiMobx,
    SiUnity,
    SiUnrealengine,
} from "react-icons/si";

interface MultiSelectorZoneProps {
    onMultiChange?: (values: string[]) => void;
}

export function MultiSelectorZone({ onMultiChange }: MultiSelectorZoneProps) {
    return (
        <div className="w-[180px] md:w-[220px]">
            <MultiSelect
                maxCount={1}
                options={[
                    { label: "React", value: "react", icon: SiReact },
                    { label: "Next.js", value: "nextjs", icon: SiNextdotjs },
                    { label: "Vue.js", value: "vuejs", icon: SiVuedotjs },
                    {
                        label: "Nuxt.js",
                        value: "nuxtjs",
                        icon: () => (
                            <img
                                src="/icons/NuxtJS.png"
                                alt="Nuxt.js"
                                className="h-5 w-5 mr-1"
                                style={{
                                    display: "inline-block",
                                    filter: "brightness(0) invert(1)",
                                }}
                            />
                        )
                    },
                    { label: "Angular", value: "angular", icon: SiAngular },
                    { label: "Svelte", value: "svelte", icon: SiSvelte },
                    { label: "Remix", value: "remix", icon: SiRemix },
                    { label: "Astro", value: "astro", icon: SiAstro },
                    { label: "Gatsby", value: "gatsby", icon: SiGatsby },
                    { label: "Express.js", value: "expressjs", icon: SiExpress },
                    { label: "Fastify", value: "fastify", icon: SiFastify },
                    { label: "NestJS", value: "nestjs", icon: SiNestjs },
                    { label: "Django", value: "django", icon: SiDjango },
                    { label: "Flask", value: "flask", icon: SiFlask },
                    { label: "Laravel", value: "laravel", icon: SiLaravel },
                    { label: "Ruby on Rails", value: "rubyonrails", icon: SiRubyonrails },
                    { label: "Spring Boot", value: "springboot", icon: SiSpringboot },
                    { label: "Flutter", value: "flutter", icon: SiFlutter },
                    { label: "React Native", value: "reactnative", icon: SiReactrouter },
                    { label: "Tailwind CSS", value: "tailwindcss", icon: SiTailwindcss },
                    {
                        label: "Three.js",
                        value: "threejs",
                        icon: () => (
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg"
                                alt="Three.js"
                                className="h-5 w-5 mr-1"
                                style={{
                                    display: "inline-block",
                                    filter: "invert(1)",
                                }}
                            />
                        )
                    },
                    {
                        label: "D3.js",
                        value: "d3js",
                        icon: () => (
                            <img
                                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/d3dotjs.svg"
                                alt="D3.js"
                                className="h-3.5 w-3.5 mr-2"
                                style={{
                                    display: "inline-block",
                                    filter: "invert(1)",
                                }}
                            />
                        )
                    },
                    { label: "jQuery", value: "jquery", icon: SiJquery },
                    {
                        label: "Bootstrap",
                        value: "bootstrap",
                        icon: () => (
                            <img
                                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/bootstrap.svg"
                                alt="Bootstrap"
                                className="h-4 w-4 mr-2"
                                style={{
                                    display: "inline-block",
                                    filter: "invert(1)",
                                }}
                            />
                        ),
                    },
                    { label: "Gin", value: "gin", icon: SiGin },
                    { label: "Electron", value: "electron", icon: SiElectron },
                    { label: "SolidJS", value: "solidjs", icon: SiSolid },
                    { label: "Qwik", value: "qwik", icon: SiQwik },
                    { label: "Phoenix", value: "phoenix", icon: SiPhoenixframework },
                    {
                        label: "Rails",
                        value: "rails",
                        icon: () => (
                            <img
                                src="/icons/Rails.webp"
                                alt="Rails"
                                className="h-5 w-4 mr-2"
                                style={{
                                    display: "inline-block",
                                    filter: "invert(1)",
                                }}
                            />
                        )
                    },

                    { label: "CodeIgniter", value: "codeigniter", icon: SiCodeigniter },
                    { label: "Zend", value: "zend", icon: SiZend },
                    { label: "CakePHP", value: "cakephp", icon: SiCakephp },
                    { label: ".NET", value: "dotnet", icon: SiDotnet },
                    {
                        label: "C#",
                        value: "csharp",
                        icon: () => (
                            <img
                                src="/icons/c-sharp.png"
                                alt="C#"
                                className="h-4 w-4 mr-2"
                                style={{
                                    display: "inline-block",
                                    filter: "invert(1)",
                                }}
                            />
                        ),
                    },
                    { label: "PHP", value: "php", icon: SiPhp },
                    { label: "Go", value: "go", icon: SiGo },
                    { label: "Rust", value: "rust", icon: SiRust },
                    { label: "Perl", value: "perl", icon: SiPerl },
                    { label: "PostgreSQL", value: "postgresql", icon: SiPostgresql },
                    { label: "MongoDB", value: "mongodb", icon: SiMongodb },
                    { label: "MySQL", value: "mysql", icon: SiMysql },
                    { label: "Redis", value: "redis", icon: SiRedis },
                    { label: "RubyGems", value: "rubygems", icon: SiRubygems },
                    { label: "Kotlin", value: "kotlin", icon: SiKotlin },
                    { label: "Spring", value: "spring", icon: SiSpring },
                    { label: "C++", value: "cplusplus", icon: SiCplusplus },
                    {
                        label: "Java",
                        value: "java",
                        icon: () => (
                            <img
                                src="/icons/JAVA.png"
                                alt="Java"
                                className="h-4 w-4 mr-2"
                                style={{
                                    display: "inline-block",
                                    filter: "invert(1)",
                                }}
                            />
                        ),
                    },
                    { label: "C", value: "c", icon: SiC },
                    { label: "Scala", value: "scala", icon: SiScala },
                    { label: "Elixir", value: "elixir", icon: SiElixir },
                    { label: "Haskell", value: "haskell", icon: SiHaskell },
                    { label: "Julia", value: "julia", icon: SiJulia },
                    { label: "TypeScript", value: "typescript", icon: SiTypescript },
                    { label: "JavaScript", value: "javascript", icon: SiJavascript },
                    { label: "Kubernetes", value: "kubernetes", icon: SiKubernetes },
                    { label: "Docker", value: "docker", icon: SiDocker },
                    { label: "TensorFlow", value: "tensorflow", icon: SiTensorflow },
                    { label: "PyTorch", value: "pytorch", icon: SiPytorch },
                    { label: "FastAPI", value: "fastapi", icon: SiFastapi },
                    { label: "Meteor", value: "meteor", icon: SiMeteor },
                    { label: "Backbone.js", value: "backbonejs", icon: SiBackbone },
                    { label: "Bulma", value: "bulma", icon: SiBulma },
                    {
                        label: "Material UI",
                        value: "materialui",
                        icon: () => (
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg"
                                alt="Material UI"
                                className="h-4 w-4 mr-2"
                                style={{
                                    display: "inline-block"
                                }}
                            />
                        ),
                    },
                    { label: "Chakra UI", value: "chakraui", icon: SiChakraui },
                    { label: "Redux", value: "redux", icon: SiRedux },
                    { label: "MobX", value: "mobx", icon: SiMobx },
                    {
                        label: "Xamarin",
                        value: "xamarin",
                        icon: () => (
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg"
                                alt="Xamarin"
                                className="h-4 w-4 mr-2"
                                style={{ display: "inline-block" }}
                            />
                        ),
                    },
                    { label: "Unity", value: "unity", icon: SiUnity },
                    { label: "Unreal Engine", value: "unrealengine", icon: SiUnrealengine },
                ]}
                onValueChange={(value) => {
                    if (onMultiChange) onMultiChange(value);
                }}
                placeholder="Select Technologys"
                className="min-h-[40px] py-1 shadow-sm bg-black/40 dark:bg-white/5"
            />
        </div>
    );
}