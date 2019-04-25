module Bit.Tests.ViewModels {

    @ComponentDependency({
        name: "LookupsSearchViewModel", template: `

<dto-form ng-model="vm.product">
    <rad-combo-box rad-data-source="vm.countriesDataSource" lookup-search="true" ng-model="vm.product.buildLocationId" />
    <br />
    {{vm.product.buildLocationId}}
    {{vm.countriesDataSource.current.Name}}
</dto-form>

` })
    export class LookupsSearchViewModel {

        public constructor(@Inject("EntityContextProvider") public entityContextProvider: Contracts.IEntityContextProvider) {

        }

        public product = new BitTestsModel.ProductDto();

        public countriesDataSource: kendo.data.DataSource;

        @Command()
        public async $onInit(): Promise<void> {
            let onlineContext = await this.entityContextProvider.getContext<TestContext>("Test");
            this.countriesDataSource = onlineContext.countries.getAllCountries().asKendoDataSource();
        }
    }

    @ComponentDependency({
        name: "CountryDtoSearchComponent",
        template: `
 <rad-grid rad-data-source="vm.filterDataSource">
    <view-template>
        <columns>
            <column name="id" title="id"></column>
            <column name="name" title="name"></column>
        </columns>
    </view-template>
</rad-grid>
`,
        bindings: {
            filterDataSource: "<"
        }
    })
    export class CountryDtoSearchComponent {

    }
}
