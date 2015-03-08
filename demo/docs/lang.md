# Language Reference

#### set
    <#set#>
#### Literals
    <#=$header#>
    <#$header#>
#### If / ElseIf / Else
    <#if first#>
        <li>this is first</li>
    <#else if second#>
        <li>this is second</li>
    <#else#>
        <li>this is else</li>
    <#/if#>
#### Foreach Loop
    <#each val,index in items#>
        <#$val#>
    <#/each#>
#### include
    <#include 'tpl', data#>
#### stop
    <#stop#>
#### comment
    <##content#>
